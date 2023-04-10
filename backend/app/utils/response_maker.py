def make_response(success, data=None, message=None):
    res = {
        'success': success,
    }
    if data:
        res['data'] = data
    if message:
        res['message'] = message

    return res
