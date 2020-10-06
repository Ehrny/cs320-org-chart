from flask import Flask
import bcrypt

app = new Flask(__name__)

@app.route('/auth')
def auth():
    return {'username': 'admin',
            'hash': '$2y$12$286JdmrSw/2j/8gON4w3Cuh/ZFz1Pm2x6bgJXx3c4M.0qnKQ9Fm7y'}
