import * as fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';
// @ts-ignore does not include typings
import { GetListByKeyword } from 'youtube-search-api';

import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

// Appdata path based on OS
let appData =
  process.env.APPDATA ||
  (process.platform == 'darwin'
    ? process.env.HOME + '/Library/Preferences'
    : process.env.HOME + '/.local/share');

// Audio player
let player: HTMLAudioElement | undefined = undefined;

/**
 * Play a song by name
 */
export const playSong: Executable = {
  name: 'play',
  useage: 'play <song>',
  description: 'Play a song',
  onExecute: async (args: string[]) => {
    // If no arguments were passed, and a song is already playing, resume it
    if (args.length === 0 && player) {
      player.play();

      api.sendMessage({
        text: 'Playing',
        newLine: true,
      });

      return;
    }

    // If no song is specified, show an error
    if (args.length === 0) {
      api.sendError('Please specify a song name');
      return;
    }

    // If the TSOS folder does not exist, create it
    if (!fs.existsSync(appData + '/TSOS/')) {
      fs.mkdirSync(appData + '/TSOS/');
    }

    // If the TSOS/songs folder does not exist, create it
    if (!fs.existsSync(appData + '/TSOS/songs/')) {
      fs.mkdirSync(appData + '/TSOS/songs/');
    }
    api.sendMessage({
      text: 'Downloading song...',
      newLine: true,
    });

    // Search YouTube for the song
    let search = await GetListByKeyword(args.join(' '), false, 1);

    // The first element in the array is the song
    let song = search.items[0];
    let songPath = path.join(appData, '/TSOS/songs/' + song.id + '.mp3');

    // Download the song
    let dl = ytdl(song.id, {
      filter: 'audioonly',
    }).pipe(fs.createWriteStream(songPath));

    // Once the song is downloaded, play it
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

    // If an error occurs, show it
    dl.on('error', err => {
      api.sendError(err.toString());
    });
  },
};

/**
 * Pause the song
 */
export const pauseSong: Executable = {
  name: 'pause',
  useage: 'pause',
  description: 'Pause the song',
  onExecute: () => {
    // If a song is playing, pause it
    if (player) {
      player.pause();
      api.sendMessage({
        text: 'Paused',
        newLine: true,
      });
    }
  },
};

/**
 * Stop the song
 */
export const stop: Executable = {
  name: 'stop',
  useage: 'stop',
  description: 'Stops the song',
  onExecute: () => {
    // If a song is playing, stop it
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
