import { Text } from "@ui-kitten/components"
import { ScrollView } from "react-native"

type Props = {
    isHidden: boolean
}

const InvestmentPage = ({ isHidden = false }: Props) => {
    return (
        <ScrollView>
            <Text>Investment page</Text>
        </ScrollView>
    )
}

export default InvestmentPage;