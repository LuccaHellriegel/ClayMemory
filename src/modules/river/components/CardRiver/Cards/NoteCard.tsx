import React, { useRef, useEffect, MutableRefObject } from "react";
import { HybridCardField } from "../HybridCardField";
import { NoteOrigin } from "../../../../cards/model/model-origin";
import { useDispatch, useSelector } from "react-redux";
import cards from "../../../../cards";
import { DeleteCardButton } from "../Buttons/DeleteCardButton";
import { JumpToOriginButton } from "../Buttons/JumpToOriginButton";
import { GrabForFieldButton } from "../Buttons/GrabForFieldButton";
import { getHoveredCardData } from "../../../selectors";
import focus from "../../../../focus";
import { trySetSourceCard } from "../../../actions";
import { Card } from "@material-ui/core";
import { noteText } from "../../../../../shared/text";
import { CardProps, borderStyle } from "./ClayCard";
//TODO-PERF: investigate if this hover-store approach is too slow, useRef instead?
export const NoteCard = ({ config }: CardProps) => {
	const dispatch = useDispatch();
	const { id } = useSelector(getHoveredCardData);
	const isHoveredCard = config.cardID === id;

	// we only offer one way to use card-content in other cards: extract
	// we do not allow grabbing from other cards, just from the document, so we only need the grab button in the ActiveRiver
	//TODO-NICE: allow grabbing from other cards
	const isActiveRiver = useSelector(focus.selectors.getDisplayFocus) === "ACTIVE_RIVER";

	const ref: MutableRefObject<undefined | HTMLDivElement> = useRef();
	useEffect(() => {
		if (ref.current && isHoveredCard) {
			(ref.current as HTMLDivElement).focus();
			(ref.current as HTMLDivElement).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		}
	});

	return (
		<Card variant="elevation" elevation={5} style={isHoveredCard ? borderStyle : undefined} ref={ref}>
			<HybridCardField
				saveChanges={(value) => {
					dispatch(cards.actions.updateCardContent(value, config.cardID, "note", "REPLACE", config.origin));
				}}
				storeValue={config.content as string}
				label={noteText}
				variant="filled"
				style={{ backgroundColor: "#CBF3F0" }}
				InputLabelProps={{ style: { color: "#000000" } }}
				onMouseEnter={() => {
					dispatch(focus.actions.tryUpdateFocus("RIVER"));
					dispatch(trySetSourceCard("note", config.origin));
				}}
			></HybridCardField>
			<DeleteCardButton cardID={config.cardID}></DeleteCardButton>
			{isActiveRiver && <GrabForFieldButton cardConfig={config} creationType="note"></GrabForFieldButton>}
			{config.origin && <JumpToOriginButton cardOrigin={config.origin as NoteOrigin}></JumpToOriginButton>}
		</Card>
	);
};
