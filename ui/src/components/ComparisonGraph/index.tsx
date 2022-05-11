import { useEffect, useState } from "react";
import { Container, Label, Progress } from "semantic-ui-react";
import styled from "styled-components";
import { Goal } from "../../App";

interface ComparisonGraphProps {
    outTotal: number;
    inTotal: number;
    outPercent: number;
    inPercent: number;
    goal: Goal;
}
  
export default function ComparisonGraph(props: ComparisonGraphProps) {
    const { outTotal, outPercent, inTotal, inPercent, goal } = props;
    
    const [goalMonths, setGoalMonths] = useState<number>(0);

    useEffect(() => {
        if (props.goal) {
          setGoalMonths(Math.round(props.goal.amount / (inTotal - outTotal)));
        }
      }, [inTotal, outTotal, goal]);

    return <FixedBottomDiv>
            <Container>
                <StyledComparisonContainer>
                    <div>
                        <StyledBarTotal>
                            outgoings: {outTotal} <Label size="mini">KR.</Label>
                        </StyledBarTotal>
                        <h3>Spending Percentage</h3>
                        <Progress size="small" percent={outPercent} color="red" />
                    </div>
                    <div>
                    <StyledBarTotal>
                        you are saving: {inTotal - outTotal}{" "}
                        <Label size="mini">KR.</Label>
                    </StyledBarTotal>
                    <h3>Income Percentage</h3>
                    <Progress size="small" percent={inPercent} color="green" />
                    </div>

                    {goal.name !== "" ? (
                    <div>
                        <h3>
                        Goal: {goal.name}, requiring: {goal.amount}{" "}
                        <Label size="mini">KR.</Label>
                        </h3>
                        {goalMonths < 0 ? (
                        <p>You need to make more savings to achieve your goal</p>
                        ) : (
                        <p>You will achieve your goal in {goalMonths} months</p>
                        )}
                    </div>
                    ) : (
                    <div>
                        <h3>No goal has been added</h3>
                    </div>
                    )}
                </StyledComparisonContainer>
            </Container>
        </FixedBottomDiv>  

}

const FixedBottomDiv = styled.div`
  -webkit-box-shadow: 0px -4px 3px rgba(100, 100, 100, 0.2);
  -moz-box-shadow: 0px -4px 3px rgba(100, 100, 100, 0.2);
  box-shadow: 0px -4px 3px rgba(100, 100, 100, 0.2);
  position: fixed;
  width: 100%;
  bottom: 0px;
  background-color: white;
  padding: 0;
`;

const StyledComparisonContainer = styled.div`
  padding: 30px;
  text-align: left;
`;

const StyledBarTotal = styled.h3`
  position: relative;
  float: right;
`;
