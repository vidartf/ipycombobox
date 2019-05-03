// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import expect = require('expect.js');

import {
  // Add any needed widget imports here (or from controls)
} from '@jupyter-widgets/base';

import {
  createTestModel
} from './utils.spec';

import {
  ComboboxModel,
  ComboboxView
} from '../../src/'


describe('Combobox', () => {

  describe('ComboboxModel', () => {

    it('should be createable', () => {
      let model = createTestModel(ComboboxModel);
      expect(model).to.be.an(ComboboxModel);
      expect(model.get('value')).to.be('Hello World');
    });

    it('should be createable with a value', () => {
      let state = { value: 'Foo Bar!' };
      let model = createTestModel(ComboboxModel, state);
      expect(model).to.be.an(ComboboxModel);
      expect(model.get('value')).to.be('Foo Bar!');
    });

  });

  describe('ComboboxView', () => {

    beforeEach(async function () {
      this.model = createTestModel(ComboboxModel);
    });

    it('construction', function () {
      const options = {
        model: this.model
      };
      const view = new ComboboxView(options);
      expect(view).to.not.be(undefined);
    });

    it('no invalid flag when not checking', function () {
      this.model.set({
        value: 'ABC',
        options: ['ABCDEF', '123', 'foobar'],
        ensure_option: false,
      });
      const options = {
        model: this.model
      };
      const view = new ComboboxView(options);
      view.render();
      expect(view.textbox.classList.contains(
        'jpwidgets-invalidComboValue')).to.equal(false);
    });

    it('no invalid flag with valid value', function () {
      this.model.set({
        value: 'ABCDEF',
        options: ['ABCDEF', '123', 'foobar'],
        ensure_option: true,
      });
      const options = {
        model: this.model
      };
      const view = new ComboboxView(options);
      view.render();
      expect(view.textbox.classList.contains(
        'jpwidgets-invalidComboValue')).to.equal(false);
    });

    it('sets invalid flag when it should', function () {
      this.model.set({
        value: 'ABC',
        options: ['ABCDEF', '123', 'foobar'],
        ensure_option: true,
      });
      const options = {
        model: this.model
      };
      const view = new ComboboxView(options);
      view.render();
      expect(view.textbox.classList.contains(
        'jpwidgets-invalidComboValue')).to.equal(true);
    });


  });

});
