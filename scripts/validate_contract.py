#!/usr/bin/env python3
"""Check declared interaction contracts, not rendered science or teaching quality."""
import json
import sys
from pathlib import Path


def validate(c):
    errors = []
    def need(ok, message):
        if not ok:
            errors.append(message)
    def text(v):
        return isinstance(v, str) and bool(v.strip())
    def strings(v):
        return isinstance(v, list) and all(text(x) for x in v)
    need(isinstance(c, dict), 'contract must be an object')
    if not isinstance(c, dict):
        return errors
    need(c.get('version') == '3.0', 'version must be 3.0')
    need(text(c.get('goal')), 'goal is required')
    model = c.get('model', {})
    need(isinstance(model, dict) and text(model.get('assumptions')) and text(model.get('evidence')), 'model assumptions and evidence required')
    arrays = {}
    for name in ('states', 'encodings', 'actions', 'preserved', 'checks'):
        val = c.get(name)
        need(isinstance(val, list), name + ' must be an array')
        arrays[name] = val if isinstance(val, list) else []
        if name != 'preserved':
            need(bool(arrays[name]), name + ' must not be empty')
    state_ids, action_ids, enc = set(), {}, {}
    for s in arrays['states']:
        if not isinstance(s, dict):
            errors.append('state must be an object'); continue
        sid = s.get('id')
        if not text(sid):
            errors.append('state id required'); continue
        need(sid not in state_ids, 'duplicate state: ' + sid)
        state_ids.add(sid)
        need(text(s.get('meaning')), 'state meaning required: ' + sid)
    for e in arrays['encodings']:
        if not isinstance(e, dict):
            errors.append('encoding must be an object'); continue
        fields = ('scope', 'channel', 'token', 'role', 'meaning')
        if not all(text(e.get(k)) for k in fields):
            errors.append('encoding fields required'); continue
        need(e['role'] in {'identity','state','quantity','relation','attention','observer'}, 'invalid encoding role')
        k = (e['scope'], e['channel'], e['token'])
        meaning = (e['role'], e['meaning'])
        need(k not in enc or enc[k] == meaning, 'encoding conflict: ' + '/'.join(k))
        enc[k] = meaning
    for a in arrays['actions']:
        if not isinstance(a, dict):
            errors.append('action must be an object'); continue
        aid = a.get('id')
        if not text(aid):
            errors.append('action id required'); continue
        need(aid not in action_ids, 'duplicate action: ' + aid)
        action_ids[aid] = a
        need(a.get('kind') in {'model','compare','time','construct','observe','inspect'}, 'invalid action kind: ' + aid)
        for field in ('changes', 'fixed'):
            need(strings(a.get(field)), 'action string array required: ' + aid + '/' + field)
        if strings(a.get('changes')) and strings(a.get('fixed')):
            need(not set(a['changes']) & set(a['fixed']), 'changed/fixed overlap: ' + aid)
        need(text(a.get('feedback')), 'feedback required: ' + aid)
    comp = c.get('comparison')
    if not isinstance(comp, dict) or not isinstance(comp.get('required'), bool):
        errors.append('comparison.required must be boolean')
    elif comp['required']:
        for field in ('baseline', 'target'):
            need(text(comp.get(field)) and comp[field] in state_ids, 'unknown comparison ' + field)
        need(comp.get('baseline') != comp.get('target'), 'comparison states must differ')
        aid = comp.get('action')
        need(text(aid) and aid in action_ids and action_ids[aid].get('kind') == 'compare', 'comparison action must reference compare kind')
        need(strings(comp.get('fixed')) and bool(comp.get('fixed')), 'comparison fixed conditions required')
        need(text(comp.get('placement')), 'comparison visible placement required')
    else:
        need(text(comp.get('reason')), 'reason required when comparison omitted')
    for item in arrays['preserved']:
        need(isinstance(item, dict) and text(item.get('feature')) and item.get('status') in {'retained','changed_with_reason'} and text(item.get('evidence')), 'preserved feature needs status and evidence')
    areas = set()
    for item in arrays['checks']:
        if not isinstance(item, dict):
            errors.append('check must be an object'); continue
        if text(item.get('area')):
            areas.add(item['area'])
        need(item.get('status') in {'tested','reviewed','pending'} and text(item.get('evidence')), 'check needs explicit status and evidence')
    need({'model','semantics','interaction','layout','host'} <= areas, 'missing check areas')
    return errors


if __name__ == '__main__':
    try:
        if len(sys.argv) != 2:
            raise ValueError('usage: validate_contract.py interaction-contract.json')
        errors = validate(json.loads(Path(sys.argv[1]).read_text()))
    except (OSError, ValueError) as exc:
        print('ERROR:', exc); sys.exit(2)
    if errors:
        print('\n'.join('ERROR: ' + e for e in errors)); sys.exit(1)
    print('Contract structure passed. Scientific validity, rendered semantics and pending checks are NOT certified.')
