import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import { StyledTotalGrid } from "../MoneyIn";

interface MoneyTotalProps {
    text: string;
    total: number;
}
  
export default function MoneyTotal(props: MoneyTotalProps) {

    const { total, text } = props

    return <StyledGridRow>
        <Grid.Column width={16}>
          <StyledTotalGrid>
            <DescriptionColumn width={10}>
              <StyledContainer><h3>{ text }</h3></StyledContainer>
            </DescriptionColumn>
            <AmountColumn width={6}>
              <StyledContainer>
                <h2>{total} kr.</h2>
                <div>Pr.måned</div>
              </StyledContainer>
            </AmountColumn>
          </StyledTotalGrid>
        </Grid.Column>
      </StyledGridRow>
   
}

const StyledContainer = styled.div`
    padding: 32px 24px;

    h2 {
      font-weight: 500;
      font-size: 34px;
      line-height: 40px;
      color: #00343E;
    }

    h3 {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #00343E;
    }
`;

const StyledGridRow = styled(Grid.Row)`
  text-align: center;
`;

export const DescriptionColumn = styled(Grid.Column)`
  text-align: left;
`;

export const AmountColumn = styled(Grid.Column)`
  text-align: right;
`;