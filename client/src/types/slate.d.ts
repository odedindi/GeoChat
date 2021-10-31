import type { Descendant, BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor, RenderElementProps } from 'slate-react';

export interface ParagraphElement {
	type: 'paragraph';
	children: Descendant[];
}

export interface LinkElement {
	type: 'link';
	url: string;
	children: Descendant[];
}

export interface MentionElement {
	type: 'mention';
	character: string;
	children: CustomText[];
}

export interface ImageElement {
	type: 'image';
	url: string;
	children: EmptyText[];
}

export interface VideoElement {
	type: 'video';
	url: string;
	children: EmptyText[];
}

type CustomElement =
	| MentionElement
	| ParagraphElement
	| ImageElement
	| VideoElement;

export interface CustomText {
	bold?: boolean;
	italic?: boolean;
	code?: boolean;
	text: string;
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export interface RenderMentionElementProps extends RenderElementProps {
	element: MentionElement;
}

export interface ReadOnlySlateProps {
	value: CustomTypes['ParagraphElement'][];
}

declare module 'slate' {
	interface CustomTypes {
		Editor: CustomEditor;

		Element: CustomElement;

		ParagraphElement: ParagraphElement;
		MentionElement: MentionElement;
		ImageElement: ImageElement;
		VideoElement: VideoElement;

		Text: CustomText;

		RenderElementProps: RenderMentionElementProps;
		ReadOnlySlateProps: ReadOnlySlateProps;
		Descendant: CustomElement | CustomText;
	}
}
