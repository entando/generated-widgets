import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Snackbar, SnackbarContent, makeStyles } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const Notification = props => {
  const { className, variant, message, onClose } = props;
  const classes = useStyles(props);

  if (!message) return '';

  const Icon = variantIcon[variant];
  const messageTemplate = (
    <span className={classes.message}>
      <Icon className={clsx(classes.icon, classes.iconVariant)} />
      {message}
    </span>
  );

  return (
    <Snackbar open onClose={onClose}>
      <SnackbarContent
        className={clsx(classes[variant], className)}
        message={messageTemplate}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

Notification.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'error', 'info']),
  message: PropTypes.string,
  onClose: PropTypes.func,
};

Notification.defaultProps = {
  message: null,
  className: '',
  variant: 'info',
  onClose: () => {},
};

export default Notification;
