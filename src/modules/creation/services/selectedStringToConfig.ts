import { UpdateType, CardConfig, CreationType, QACardContent, CardType } from "../../cards/model";

type updateContentStrFunction = (oldStr: string, newStr: string) => string;

type partialUpdateContentStrFunction = (oldStr: string) => string;

const updateContentStrFunctions: { [key in UpdateType]: updateContentStrFunction } = {
	REPLACE: (_: string, newStr: string) => newStr,
	APPEND: (oldStr: string, newStr: string) => oldStr + newStr,
};

const createPartialUpdateContentStrFunction = (updateType: UpdateType, newStr: string) => (oldStr: string) =>
	updateContentStrFunctions[updateType](oldStr, newStr);

type creationFunction = (oldConfig: CardConfig, partialUpdateFunction: partialUpdateContentStrFunction) => CardConfig;

const defaultCreationFunction: creationFunction = (oldConfig, partialUpdateFunction) => {
	return { ...oldConfig, content: partialUpdateFunction(oldConfig.content as string) };
};

const creationFunctions: {
	[key in CreationType]: creationFunction;
} = {
	NOTE: defaultCreationFunction,
	Q: (oldConfig, partialUpdateFunction) => {
		const content = oldConfig.content as QACardContent;
		return { ...oldConfig, content: { ...content, q: partialUpdateFunction(content.q) } };
	},
	A: (oldConfig, partialUpdateFunction) => {
		const content = oldConfig.content as QACardContent;
		return { ...oldConfig, content: { ...content, a: partialUpdateFunction(content.a) } };
	},
};

export const selectedStringToConfig = (
	selectedStr: string,
	type: CardType,
	creationType: CreationType,
	updateType: UpdateType,
	currentCard?: CardConfig
): CardConfig => {
	const partialUpdateFunction = createPartialUpdateContentStrFunction(updateType, selectedStr);
	const isCardUpdate = !!currentCard;
	return isCardUpdate
		? creationFunctions[creationType](currentCard as CardConfig, partialUpdateFunction)
		: creationFunctions[creationType]({ type, content: "" }, partialUpdateFunction);
};
