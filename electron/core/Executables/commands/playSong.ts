import * as fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';
// @ts-ignore does not include typings
import { GetListByKeyword } from 'youtube-search-api';

import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

let appData =
  process.env.APPDATA ||
  (process.platform == 'darwin'
    ? process.env.HOME + '/Library/Preferences'
    : process.env.HOME + '/.local/share');

let player: HTMLAudioElement | undefined = undefined;

export const playSong: Executable = {
  name: 'play',
  useage: 'play <song>',
  description: 'Play a song',
  onExecute: async (args: string[]) => {
    if (args.length === 0 && player) {
      player.play();

      api.sendMessage({
        text: 'Playing',
        newLine: true,
      });

      return;
    }

    if (args.length === 0) {
      api.sendError('Please specify a song name');
      return;
    }

    if (!fs.existsSync(appData + '/TSOS/')) {
      fs.mkdirSync(appData + '/TSOS/');
    }

    if (!fs.existsSync(appData + '/TSOS/songs/')) {
      fs.mkdirSync(appData + '/TSOS/songs/');
    }
    api.sendMessage({
      text: 'Downloading song...',
      newLine: true,
    });

    let search = await GetListByKeyword(args.join(' '), false, 1);

    let song = search.items[0];
    let songPath = path.join(appData, '/TSOS/songs/' + song.id + '.mp3');

    let dl = ytdl(song.id, {
      filter: 'audioonly',
    }).pipe(fs.createWriteStream(songPath));

    dl.on('finish', () => {
      api.sendMessage({
        text: 'Song downloaded',
        newLine: true,
      });
      player = new Audio('atom://' + songPath);
      player.play();

      api.sendMessage({
        text: 'Playing song...',
        newLine: true,
      });
    });

    dl.on('error', err => {
      api.sendError(err.toString());
    });
  },
};

export const pauseSong: Executable = {
  name: 'pause',
  useage: 'pause',
  description: 'Pause the song',
  onExecute: () => {
    if (player) {
      player.pause();
      api.sendMessage({
        text: 'Paused',
        newLine: true,
      });
    }
  },
};

export const stop: Executable = {
  name: 'stop',
  useage: 'stop',
  description: 'Stops the song',
  onExecute: () => {
    if (player) {
      player.pause();

      player = undefined;
      api.sendMessage({
        text: 'Stopped',
        newLine: true,
      });
    }
  },
};
