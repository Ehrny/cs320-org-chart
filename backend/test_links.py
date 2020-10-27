import links
import json

def test_get():
    assert json.dumps(links.get("http://example.com")) == json.dumps({
        "method": "GET",
        "relative_uri": "http://example.com"
    })
def test_post():
    assert json.dumps(links.post("http://example.com")) == json.dumps({
        "method": "POST",
        "relative_uri": "http://example.com"
    })
def test_put():
    assert json.dumps(links.put("http://example.com")) == json.dumps({
        "method": "PUT",
        "relative_uri": "http://example.com"
    })
def test_delete():
    assert json.dumps(links.delete("http://example.com")) == json.dumps({
        "method": "DELETE",
        "relative_uri": "http://example.com"
    })
