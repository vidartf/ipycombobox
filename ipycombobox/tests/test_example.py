#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Vidar Tonaas Fauske.
# Distributed under the terms of the Modified BSD License.

import pytest

from ..combobox import Combobox


def test_combobox_creation_blank():
    w = Combobox()
    assert w.value == 'Hello World'
