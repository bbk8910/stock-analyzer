import { LoadingButton } from "@mui/lab";

export function ServiceButton(props) {
  const { loading, onClick, type, name, className, icon } = props;
  return (
    <LoadingButton
      className={className}
      onClick={onClick}
      endIcon={icon}
      loading={loading}
      loadingPosition="end"
      variant="contained"
      type="submit"
    >
      <span>{name}</span>
    </LoadingButton>
  );
}
