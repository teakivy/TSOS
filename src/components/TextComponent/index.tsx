import React, { Component } from 'react';
import { BaseTextComponent } from '../../../electron/core/TextComponent/TextComponentTypes';

export class TextComponent extends Component<{
  component: BaseTextComponent;
}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          color: this.props.component.color,
          backgroundColor: this.props.component.backgroundColor,
          fontStyle: this.props.component.italic ? 'italic' : 'normal',
        }}
      >
        {this.props.component.text}
      </div>
    );
  }
}

export default TextComponent;
