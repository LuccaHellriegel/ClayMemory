import { UpdateType, CardPayloadConfig, CardType } from "../model/model";
import { QACardContent, CardField } from "../model/model-content";

type UpdateContentStrFunction = (oldStr: string, newStr: string) => string;

const updateContentStrFunctions: { [key in UpdateType]: UpdateContentStrFunction } = {
	REPLACE: (_: string, newStr: string) => newStr,
	APPEND: (oldStr: string, newStr: string) => oldStr + newStr,
};

type partialUpdateContentStrFunction = (oldStr: string) => string;

const createPartialUpdateContentStrFunction = (updateType: UpdateType, newStr: string) => (oldStr: string) =>
	updateContentStrFunctions[updateType](oldStr, newStr);

type creationFunction = (
	oldConfig: CardPayloadConfig,
	partialUpdateFunction: partialUpdateContentStrFunction
) => CardPayloadConfig;

const defaultCreationFunction: creationFunction = (oldConfig, partialUpdateFunction) => {
	return { ...oldConfig, content: partialUpdateFunction(oldConfig.content as string) };
};

const creationFunctions: {
	[key in CardField]: creationFunction;
} = {
	note: defaultCreationFunction,
	q: (oldConfig, partialUpdateFunction) => {
		const content = oldConfig.content as QACardContent;
		return { ...oldConfig, content: { ...content, q: partialUpdateFunction(content.q) } };
	},
	a: (oldConfig, partialUpdateFunction) => {
		const content = oldConfig.content as QACardContent;
		return { ...oldConfig, content: { ...content, a: partialUpdateFunction(content.a) } };
	},
};

export const contentStringToConfig = (
	contentStr: string,
	type: CardType,
	outputField: CardField,
	updateType: UpdateType,
	existingCard?: CardPayloadConfig
): CardPayloadConfig => {
	const partialUpdateFunction = createPartialUpdateContentStrFunction(updateType, contentStr);
	const isCardUpdate = !!existingCard;
	return isCardUpdate
		? creationFunctions[outputField](existingCard as CardPayloadConfig, partialUpdateFunction)
		: creationFunctions[outputField]({ type, content: type === "Q-A" ? { q: "", a: "" } : "" }, partialUpdateFunction);
};
