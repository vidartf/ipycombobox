# Deprecated

This component has now been [merged into ipywidgets](https://github.com/jupyter-widgets/ipywidgets/pull/2390). As such, this repo is deprecated, and all issues/changes should be subitted to the ipywidgets repo.


# ipycombobox

[![Build Status](https://travis-ci.org/vidartf/ipycombobox.svg?branch=master)](https://travis-ci.org/vidartf/ipycombobox)
[![codecov](https://codecov.io/gh/vidartf/ipycombobox/branch/master/graph/badge.svg)](https://codecov.io/gh/vidartf/ipycombobox)


A Jupyter-widgets combobox, based on using the `<datalist>` HTML5 tag.

## Installation

You can install using `pip`:

```bash
pip install ipycombobox
```

Or if you use jupyterlab:

```bash
pip install ipycombobox
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] ipycombobox
```
