import { useEffect, useState } from "react";
import { Container, Label } from "semantic-ui-react";
import styled from "styled-components";
import { Goal } from "../../App";

interface ComparisonGraphProps {
  outTotal: number;
  inTotal: number;
  outPercent: number;
  inPercent: number;
  goal: Goal;
}

interface OverspendProps {
  overspend: number;
}

interface SavingsProps {
  savings:number;
}

const Overspend = (props: OverspendProps) => {
  return <StyledOverspendingDiv>Månedlig overforbruk: { props.overspend } <Label size="mini">kr</Label></StyledOverspendingDiv>
}

const Saving = (props: SavingsProps) => <StyledSavingDiv>Månedlig sparepotensiale: { props.savings } <Label size="mini">kr</Label></StyledSavingDiv>

export default function ComparisonGraph(props: ComparisonGraphProps) {
  const { outTotal, outPercent, inTotal, inPercent, goal } = props;
  const [savings, setSavings] = useState<number>(inTotal - outTotal);
  const [overspend, setOverspend] = useState<number>(outTotal - inTotal);
  

  const [goalMonths, setGoalMonths] = useState<number>(0);

  useEffect(() => {
    if (props.goal) {
      setGoalMonths(Math.round(props.goal.amount / (inTotal - outTotal)));
    }

    setSavings(inTotal - outTotal);
    setOverspend(outTotal - inTotal);
  }, [inTotal, outTotal, goal]);

  return (
    <FixedBottomDiv>
      <Container>
        <StyledComparisonContainer overspending={overspend > 0}>
          {/* <div>
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
          </div> */}

          <StyledOverspendingContainer>
            { (outTotal > inTotal) ? <Overspend overspend={overspend} /> : <Saving savings={savings}  /> }
          </StyledOverspendingContainer>

          {goal.name !== "" || (
            <StyledOverspendingContainer>
              {/* <h3>
                Sparemål: {goal.name}, krever: {goal.amount}{" "}
                <Label size="mini">Kr</Label>
              </h3> */}
              {goalMonths < 0 ? (
                <p>Du må spare mer for å nå sparemålet</p>
              ) : (
                <p>Hvis du setter til side dette beløpet hver måned vil nå sparemålet om {goalMonths} måneder</p>
              )}
            </StyledOverspendingContainer>) }
          {/* // ) 
          // : (
          //   <div>
          //     <h3>Det er ikke lagt til noe sparemål</h3>
          //   </div>
          // )} */}
        </StyledComparisonContainer>
      </Container>
    </FixedBottomDiv>
  );
}

export const StyledOverspendingContainer = styled.div`
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
`

const StyledSavingDiv = styled.div`
  line-height: 20px;
  width: 300px;
`;

const StyledOverspendingDiv = styled.div`
  line-height: 20px;
  width: 300px;
`;

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

interface StyledComparisonContainerProps {
  overspending: boolean;
}

const StyledComparisonContainer = styled.div<StyledComparisonContainerProps>`
  padding: 30px;
  text-align: left;
  background-color: ${(props) => (props.overspending ? "#FDEEEE" : "#E7FFE3")};
  margin: 20px;
`;

const StyledBarTotal = styled.h3`
  position: relative;
  float: right;
`;
