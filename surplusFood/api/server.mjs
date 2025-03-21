import express from 'express';

let server = null;

export function getServer(){
    if(server === null){
        server = express();
        return server;
    } else{
        return server;
    }
}