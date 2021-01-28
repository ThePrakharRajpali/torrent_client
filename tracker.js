'use strict';

const dgram = require('dgram');
const crypto = require('crypto');
const Buffer = require('buffer').Buffer;
const urlParse = require('url').parse;

module.exports.getPeers = (torrent, callback) => {
    const socket = dgram.createSocket('udp4');
    const url = torrent.announce.toString('utf8');

    udpSend(socket, buildConnReq(), url);

    socket.on('message', response => {
        if(respType(response) === 'connect'){
            const connResp = parseConnResp(response);
            const announceResp = buildAmountReq(connResp.connectionId);
            callback(announceResp.peers);
        }
    });
};

function udpSend(socket, message, rawUrl, callback = () => {}) {
    const url = urlParse(rawUrl);
    socket.send(message, 0, message.length, url.port, url.host, callback);
}

function respType(resp) {

}

function buildConnReq() {
    const buf = Buffer.alloc(16);

    buf.writeUInt32BE(0x417, 0);
    buf.writeUInt32BE(0x27101980, 4);

    buf.writeUInt32BE(0, 8);

    crypto.randomBytes(4).copy(buf, 12);

    return buf;
}

function parseConnResp(resp) {

}

function buildAnnounceReq(connId) {

}

function parseAnnounceResp(resp) {

}
