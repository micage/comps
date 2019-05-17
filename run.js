#!/usr/bin/env node
'use strict';
const apps = require('./apps.json');

const { log }  = require('util');
// const fs = require('mz/fs');
const path = require('path');
const commandLineArgs = require('command-line-args')
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


var [,, ...args] = process.argv;
log(`args: ${args}`);

let bDevelop;
let lastIndex = args[0] ? args[0].length - 1 : -1;
if (lastIndex < 0) {
    log("No args provided. Exiting.");
    process.exit();
}
bDevelop = args[0][lastIndex] !== '+';
if (!bDevelop) args[0] = args[0].slice(0, args[0].length - 1);
bDevelop ? log("DEBUG") : log("RELEASE");


const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'file', type: String, multiple: false, defaultOption: true },
    { name: 'port', type: Number, multiple: false },
];
let _args = commandLineArgs(optionDefinitions, { stopAtFirstUnknown: false });
log(`_args: ${_args}`);

let app = apps[args[0]];
if (!app) {
    log("entry not found: " + args);
    // process.exit();
}

let entry = [ `./src/apps/${app.dir}/${app.file}.js` ];
// let entry = './src/host.js';
console.log("-> dirname: " + __dirname);
console.log("-> entry: " + entry);

const config = require('./webpack.config.js');
if (bDevelop) {
    process.env.DEBUG = 'true';

    Object.assign(config, {
        mode: 'development',
        devtool: "inline-source-map",
        entry, 
        context: __dirname,
        plugins:[
            new HtmlWebpackPlugin({ title: app.dir + " development"}),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({ __DEBUG__: JSON.stringify(true) }),
        ]
    });

    const options = {
        //contentBase: 'www', // Relative directory for base of server
        host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
        hot: true, // Live-reload
        hotOnly: true,
        inline: true,
        noInfo: true,
        port: _args.port || 3020,
        stats: {
            colors: true
        }
    };

    webpackDevServer.addDevServerEntrypoints(config, options);
    const compiler = webpack(config);
    const server = new webpackDevServer(compiler, options);

    server.listen(options.port, 'localhost', () => {
        console.log('-> dev server listening on port ' + options.port);
    });
}
else {
    process.env.DEBUG = 'false';

    Object.assign(config, {
        mode: 'production',
        entry,
        context: __dirname,
        output: {
            path: path.resolve("build/", app.dir),
            filename: 'bundle.js',
        },
        plugins: [
            new HtmlWebpackPlugin({ title: app.dir }),
            new webpack.DefinePlugin({ __DEBUG__: JSON.stringify(false) }),
            new UglifyJsPlugin(),
        ]
    });
    const compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
            log('Error: ' + err + ' Stats: ' + stats);
        }
        log("done");
    });
}

