import {
  Typography,
  Grid,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { StatusMode, UpdateStatusMode } from "../common/types/image";

interface ControlPanelProps {
  isOpenCheckbox: boolean;
  updateIsOpenCheckbox: (isOpen: boolean) => void;
  currentStatus: UpdateStatusMode;
  updateStatus: (status: UpdateStatusMode) => void;
  submit: () => void;
  hasSelectedItem: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isOpenCheckbox,
  updateIsOpenCheckbox,
  currentStatus,
  updateStatus,
  submit,
  hasSelectedItem,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateIsOpenCheckbox(event.target.checked);
  };

  const handleStatusChange = (event: SelectChangeEvent<UpdateStatusMode>) => {
    updateStatus(event.target.value as UpdateStatusMode);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      style={{ marginBottom: "16px" }}
    >
      <Grid item>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>{isOpenCheckbox ? "开启复选框" : "关闭复选框"}</Grid>
            <Grid item>
              <Switch
                checked={isOpenCheckbox}
                onChange={handleCheckboxChange}
              />
            </Grid>
          </Grid>
        </Typography>
      </Grid>
      <Grid item>
        <FormControl variant="outlined" size="small">
          <InputLabel>状态</InputLabel>
          <Select
            value={currentStatus}
            onChange={handleStatusChange}
            label="状态"
          >
            <MenuItem value={StatusMode.Delete}>删除</MenuItem>
            <MenuItem value={StatusMode.Visible}>可见</MenuItem>
            <MenuItem value={StatusMode.NoVisible}>非可见</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => submit()}
          disabled={!isOpenCheckbox || !hasSelectedItem}
          style={{
            backgroundColor: isOpenCheckbox ? "#add8e6" : "",
          }}
        >
          操作
        </Button>
      </Grid>
    </Grid>
  );
};

export default ControlPanel;
