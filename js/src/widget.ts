// Copyright (c) Vidar Tonaas Fauske
// Distributed under the terms of the Modified BSD License.

import {
  ISerializers
} from '@jupyter-widgets/base';

import {
  TextModel, TextView, uuid
} from '@jupyter-widgets/controls';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';


const invalidValueClass = 'jpcombo-invalid-value';


export class ComboboxModel extends TextModel {
  defaults() {
    return {...super.defaults(),
      _model_name: ComboboxModel.model_name,
      _model_module: ComboboxModel.model_module,
      _model_module_version: ComboboxModel.model_module_version,
      _view_name: ComboboxModel.view_name,
      _view_module: ComboboxModel.view_module,
      _view_module_version: ComboboxModel.view_module_version,
      options: [],
      ensure_options: false,
    };
  }

  static serializers: ISerializers = {
      ...TextModel.serializers,
      // Add any extra serializers here
    }

  static model_name = 'ComboboxModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ComboboxView';   // Set to null if no view
  static view_module = MODULE_NAME;   // Set to null if no view
  static view_module_version = MODULE_VERSION;
}


export class ComboboxView extends TextView {
  render() {
    this.datalist = document.createElement('datalist');
    this.datalist.id = uuid();

    super.render();

    this.textbox.setAttribute('list', this.datalist.id);
    this.el.appendChild(this.datalist);
  }

  update(options?: any) {
    super.update(options);
    if (!this.datalist) {
      return;
    }

    const valid = this.isValid(this.model.get('value'));
    this.highlightValidState(valid);

    // Check if we need to update options
    if (
      (options !== undefined && options.updated_view) || (
        !this.model.hasChanged('options') &&
        !this.isInitialRender
      )
    ) {
      // Value update only, keep current options
      return;
    }

    this.isInitialRender = false;

    const opts = this.model.get('options') as string[];
    const optLines = opts.map(o => {
      return `<option value="${o}"></option>`
    });
    this.datalist.innerHTML = optLines.join('\n');
  }

  isValid(value: string): boolean {
    if (true === this.model.get('ensure_option')) {
      const options = this.model.get('options') as string[];
      if (options.indexOf(value) === -1) {
        return false;
      }
    }
    return true;
  }

  /**
   * Handles user input.
   */
  handleChanging(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    const valid = this.isValid(target.value);
    this.highlightValidState(valid);
    if (valid) {
      super.handleChanging(e);
    }
  }

  handleChanged(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    const valid = this.isValid(target.value);
    this.highlightValidState(valid);
    if (valid) {
      super.handleChanged(e);
    }
  }

  highlightValidState(valid: boolean): void {
    if (valid) {
      this.textbox.classList.remove(invalidValueClass);
    } else {
      this.textbox.classList.add(invalidValueClass);
    }
  }

  datalist: HTMLDataListElement | undefined;

  isInitialRender = true;
}
