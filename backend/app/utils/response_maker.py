def make_response(success, data=None, message=None):
    res = {
        'success': success,
    }
    if data:
        res['data'] = data
    if message and success:
        res['message'] = message
    if message:
        if isinstance(message, dict):
            errors = []
            for k, v in message.items():
                errors.append(str(v[0]) + ' for ' + str(k))
            res['errors'] = errors
        else:
            res['errors'] = [str(message)]
    return res
