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

    // Check if we need to update options
    if (options !== undefined && options.updated_view) {
      // Value update only, keep current options
      return;
    }

    this.datalist.innerHTML = '';
    for (let opt of this.model.get('options') as string[]) {
      let el = document.createElement('option');
      el.value = opt;
      this.datalist.appendChild(el);
    }
  }

  /**
   * Handles user input.
   *
   * Calling model.set will trigger all of the other views of the
   * model to update.
   */
  handleChanging(e: KeyboardEvent) {
    if (true === this.model.get('ensure_option')) {
      const target = e.target as HTMLInputElement;
      const options = this.model.get('options') as string[];
      if (options.indexOf(target.value) === -1) {
        this.highlightValidState(false);
        return;
      }
    }
    this.highlightValidState(true);
    super.handleChanging(e);
  }

  highlightValidState(valid: boolean): void {
    if (valid) {
      this.textbox.classList.remove(invalidValueClass);
    } else {
      this.textbox.classList.add(invalidValueClass);
    }
  }

  datalist: HTMLDataListElement | undefined;
}
