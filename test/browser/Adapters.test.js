import assert from 'assert';
import {
    default as memdown
} from 'memdown';
import {
    default as randomToken
} from 'random-token';

import * as RxDB from '../../dist/lib/index';
import * as util from '../../dist/lib/util';

console.dir = (d) => {
    console.log(JSON.stringify(d));
};

var platform = require('platform');

console.log('###### Browser: ######');
console.log(window.navigator.userAgent);
console.log(platform.name);
console.log(platform.version);

describe('Adapters.test.js', () => {
    describe('memory', () => {
        describe('negative', () => {
            it('should fail when no adapter was added', async() => {
                await util.assertThrowsAsync(
                    () => RxDB.create(randomToken(10), 'memory'),
                    Error
                );
            });
        });
        describe('positive', () => {
            it('should work after adding the adapter', async() => {
                RxDB.plugin(require('pouchdb-adapter-memory'));
                const db = await RxDB.create(randomToken(10), 'memory');
                assert.equal(db.constructor.name, 'RxDatabase');
                await util.promiseWait(1000);
                db.destroy();
            });
        });
    });
    describe('websql', () => {
        describe('negative', () => {
            it('should fail when no adapter was added', async() => {
                await util.assertThrowsAsync(
                    () => RxDB.create(randomToken(10), 'websql'),
                    Error
                );
            });
        });
        describe('positive', () => {
            it('should work after adding the adapter', async() => {

                if (/Firefox/.test(window.navigator.userAgent)) return;
                if (platform.name=='IE') return;

                RxDB.plugin(require('pouchdb-adapter-websql'));
                const db = await RxDB.create(randomToken(10), 'websql');
                assert.equal(db.constructor.name, 'RxDatabase');
                await util.promiseWait(1000);
                db.destroy();
            });
        });
    });
});
