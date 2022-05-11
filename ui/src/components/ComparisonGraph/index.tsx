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

  return (
    <FixedBottomDiv>
      <Container>
        <StyledComparisonContainer>
          <div>
            <StyledBarTotal>
              {outTotal} <Label size="mini">Kr</Label>
            </StyledBarTotal>
            <h3>Overforbruk</h3>
            <Progress size="small" percent={outPercent} color="red" />
          </div>
          <div>
            <StyledBarTotal>
              {inTotal - outTotal} <Label size="mini">Kr</Label>
            </StyledBarTotal>
            <h3>Sparepotensiale</h3>
            <Progress size="small" percent={inPercent} color="green" />
          </div>

          {goal.name !== "" ? (
            <div>
              <h3>
                Sparemål: {goal.name}, krever: {goal.amount}{" "}
                <Label size="mini">Kr</Label>
              </h3>
              {goalMonths < 0 ? (
                <p>Du må spare mer for å nå sparemålet</p>
              ) : (
                <p>Du vil nå sparemålet om {goalMonths} måneder</p>
              )}
            </div>
          ) : (
            <div>
              <h3>Det er ikke lagt til noe sparemål</h3>
            </div>
          )}
        </StyledComparisonContainer>
      </Container>
    </FixedBottomDiv>
  );
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
