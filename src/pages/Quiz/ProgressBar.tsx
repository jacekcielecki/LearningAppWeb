import styled from "@emotion/styled";
import { LinearProgress, linearProgressClasses } from "@mui/material";
import grey from "@mui/material/colors/grey";
import LearningAppTheme from "../../theme";
import { useEffect, useState } from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: LearningAppTheme.palette.secondary.main,
  },
}));

interface IProgressBarProps {
  questionsCount: number;
  currentQuestion: number;
}

const ProgressBar : React.FC<IProgressBarProps> = (props) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue((props.currentQuestion / props.questionsCount) * 100);
  }, [props.currentQuestion, props.questionsCount]);

    return ( 
        <>
          <BorderLinearProgress variant="determinate" value={value} />
        </>
     );
}
 
export default ProgressBar;