import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class DeleteConferenceButton extends PureComponent {
  static CONFIRM = 'yes';

  static DISCARD = 'no';

  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.state = { open: false };
  }

  handleOpen() {
    this.setState(() => ({
      open: true,
    }));
  }

  handleClose(action) {
    const { onClose } = this.props;
    this.setState(() => ({
      open: false,
    }));
    onClose(action);
  }

  render() {
    const { open } = this.state;
    const { title, description, Renderer: CustomRenderer } = this.props;
    const DefaultRenderer = ({ onClick }) => (
      <Button variant="outlined" color="primary" onClick={onClick}>
        Delete
      </Button>
    );
    const Renderer = CustomRenderer || DefaultRenderer;
    return (
      <div>
        <Renderer onClick={this.handleOpen} />
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleClose(DeleteConferenceButton.DISCARD)}
              color="primary"
              autoFocus
            >
              No
            </Button>
            <Button
              onClick={() => this.handleClose(DeleteConferenceButton.CONFIRM)}
              color="primary"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteConferenceButton.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  Renderer: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

DeleteConferenceButton.defaultProps = {
  title: 'delete',
  description: 'are you sure?',
  Renderer: null,
};
