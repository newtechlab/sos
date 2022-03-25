import { Card, Icon, Image } from "semantic-ui-react";
import { FamilyMember } from "../../App";
import childImage from './child.png';

interface FamilyMemberCardProps {
    familyMember: FamilyMember;
}

export default function FamilyMemberCard(props: FamilyMemberCardProps) {
    const { familyMember } = props;

    return <Card>
        <Image src={childImage} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{ familyMember.name }</Card.Header>
        {/* <Card.Meta>
            <span className='date'>Joined in 2015</span>
        </Card.Meta> */}
        {/* <Card.Description>
            Matthew is a musician living in Nashville.
        </Card.Description> */}
        </Card.Content>
        <Card.Content extra>
        <a>
            <Icon name='user' />
            age: { familyMember.age }
        </a>
        </Card.Content>
    </Card>
}

