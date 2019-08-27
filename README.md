# ftp-deleter
A tool to delete old files on a ftp server (eg ipcam files).

You have to setup `config.json` file:

```json
{
    "path": "/Disque dur/Camera/",
    "server": {
        "host": "mafreebox.freebox.fr",
        "user": "anonymous",
        "secure": false
    },
    "depth": 3
}
```


```bash
npm i 
npm start
```

### `depth`

The number of days you want to keep

### `path`

Where are your files

### `server`

* host - _string_ - The hostname or IP address of the FTP server. **Default:** 'localhost'
* port - _integer_ - The port of the FTP server. **Default:** 21
* secure - _mixed_ - Set to true for both control and data connection encryption, 'control' for control connection encryption only, or 'implicit' for implicitly encrypted control connection (this mode is deprecated in modern times, but usually uses port 990) **Default:** false
* secureOptions - _object_ - Additional options to be passed to `tls.connect()`. **Default:** (none)
* user - _string_ - Username for authentication. **Default:** 'anonymous'
* password - _string_ - Password for authentication. **Default:** 'anonymous@'
* connTimeout - _integer_ - How long (in milliseconds) to wait for the control connection to be established. **Default:** 10000
* pasvTimeout - _integer_ - How long (in milliseconds) to wait for a PASV data connection to be established. **Default:** 10000
* keepalive - _integer_ - How often (in milliseconds) to send a 'dummy' (NOOP) command to keep the connection alive. **Default:** 10000
