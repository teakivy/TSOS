// @ts-ignore does not include typings
import ntwk from 'network';
import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

/**
 * Print the network interfaces
 */
export const network: Executable = {
  name: 'network',
  useage: 'network',
  description: 'Get a list of network interfaces',
  onExecute: () => {
    // Get the network interfaces from the network package
    ntwk.get_interfaces_list(function (err: any, list: any) {
      if (err) {
        api.sendError(err.toString());
        return;
      }

      api.sendMessage({
        text: '',
        newLine: true,
      });

      // Print each interface
      list.forEach(function (item: any) {
        api.sendMessage([
          {
            text: item.name,
            newLine: true,
            color: 'gold',
          },
          {
            text: 'IP Address: ' + (item.ip_address || 'N/A'),
            newLine: true,
          },
          {
            text: 'Mac Address: ' + (item.mac_address || 'N/A'),
            newLine: true,
          },
          {
            text: 'Type: ' + (item.type || 'N/A'),
            newLine: true,
          },
          {
            text: 'Netmask: ' + (item.netmask || 'N/A'),
            newLine: true,
          },
          {
            text: 'Gateway IP: ' + (item.gateway_ip || 'N/A'),
            newLine: true,
          },
          {
            text: '',
            newLine: true,
          },
        ]);
      });
    });
  },
};
