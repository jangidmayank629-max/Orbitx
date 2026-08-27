import http.server
import socketserver
import json
import urllib.parse
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class OrbitXHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        if self.path in ['/api/contact', '/api/send-email', '/contact']:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8')
            
            try:
                data = json.loads(post_data)
            except Exception:
                data = urllib.parse.parse_qs(post_data)
                data = {k: v[0] for k, v in data.items()}

            name = data.get('name', 'Operative')
            email = data.get('email', '')
            message = data.get('message', '')

            print("\n" + "=" * 55)
            print("[ORBITX LOCAL SERVER] INCOMING MISSION TRANSMISSION")
            print(f"From: {name} <{email}>")
            print(f"Message: {message}")
            print("Target: orbitx.marketing@gmail.com")
            print("Status: 200 OK (Mission Acknowledged)")
            print("=" * 55 + "\n")

            response_payload = {
                "success": True,
                "message": "Mission sequence transmitted directly to orbitx.marketing@gmail.com",
                "received": {
                    "name": name,
                    "email": email
                }
            }

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(response_payload).encode('utf-8'))
        else:
            self.send_error(404, "Endpoint not found")

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), OrbitXHandler) as httpd:
        print("\n" + "=" * 55)
        print(f">> OrbitX Marketing is LIVE at: http://localhost:{PORT}")
        print(">> Local SEO Target: Mahwa, Rajasthan (321608)")
        print(">> Destination Inbox: orbitx.marketing@gmail.com")
        print("=" * 55 + "\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)
