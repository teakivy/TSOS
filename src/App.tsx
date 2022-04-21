import React from 'react';
import { Component } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { BaseTextComponent } from '../electron/core/TextComponent/TextComponentTypes';
import TextComponent from './components/TextComponent';

import './styles/App.css';

const messagesEndRef = React.createRef();
export class App extends Component<
  {},
  {
    text: BaseTextComponent[];
    input: string;
    directory: string;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: [
        { text: 'Hello World ! ' },
        { text: 'How are you?', italic: true, color: 'lightBlue' },
      ],
      input: '',
      directory: '/',
    };
  }

  componentDidMount() {
    this.setState({
      directory: window.api.fs.getCurrentDirectory(),
    });

    window.api.on('changeDir', () => {
      this.setState({
        directory: window.api.fs.getCurrentDirectory(),
      });
    });

    window.api.on('message', (m: BaseTextComponent) => {
      this.setState({
        text: [...this.state.text, m],
      });
    });
  }

  _handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      let newText = this.state.text;
      newText.push({ text: '> ', newLine: true, color: 'gold' });
      newText.push({ text: this.state.input });
      let cmdName = this.state.input.split(' ')[0];
      let cmdArgs = this.state.input.split(' ').slice(1);
      window.api.exec.runCommand(cmdName, cmdArgs);

      this.setState({ text: newText, input: '' });
    }
  };

  el: HTMLDivElement | null = null;

  render() {
    return (
      <div>
        <div className="output">
          <ScrollableFeed>
            {this.state.text.map(
              (component: BaseTextComponent, index: number) => {
                return (
                  <span>
                    {component.newLine ? <br /> : null}
                    <span className={`text-component inline-tc`} key={index}>
                      <TextComponent key={index} component={component} />
                    </span>
                  </span>
                );
              }
            )}
          </ScrollableFeed>
        </div>

        <div className="input-wrapper">
          <span className="dir-loc">
            {this.state.directory}
            <span className="dir-loc-arrow">{' > '}</span>
          </span>
          <div className="input-shell">
            <input
              type="text"
              className="input inp-comp"
              value={this.state.input}
              onChange={e => {
                this.setState({ input: e.target.value });
              }}
              onKeyDown={this._handleKeyDown}
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
