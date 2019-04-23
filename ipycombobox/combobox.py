#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Vidar Tonaas Fauske.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import Text, TypedTuple
from traitlets import Unicode, Bool
from ._frontend import module_name, module_version


class Combobox(Text):
    """TODO: Add docstring here
    """
    _model_name = Unicode('ComboboxModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('ComboboxView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    options = TypedTuple(
        trait=Unicode(),
        help="Dropdown options for the combobox"
    ).tag(sync=True)

    ensure_option = Bool(
        False,
        help='If set, ensure value is in options. Implies continuous_update=False.'
    ).tag(sync=True)
