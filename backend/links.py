"""
Methods to return standardized REST links
"""

def get(path):
    return {
        "method": "GET",
        "relative_uri": path
    }

def post(path):
    return {
        "method": "POST",
        "relative_uri": path
    }

def put(path):
    return {
        "method": "PUT",
        "relative_uri": path
    }

def delete(path):
    return {
        "method": "DELETE",
        "relative_uri": path
    }