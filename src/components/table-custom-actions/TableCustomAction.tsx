import { IconButton, Tooltip } from '@mui/material';
import { CustomActionprops } from '../../types/type';
import image from '../../svg/notification.svg';

export function AddCameraAction({ onClick, savePending }: CustomActionprops) {
  //   const { t } = useTranslation();
  return (
    <Tooltip title="notification" enterDelay={300}>
      <IconButton aria-label="expand row" size="small" onClick={onClick} disabled={savePending}>
        <img src={image} width={24} />
      </IconButton>
    </Tooltip>
  );
}
