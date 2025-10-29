import { type DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
type Props = {
    data: DefaultTypedEditorState;
    enableGutter?: boolean;
    enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export default function RichText(props: Props): import("react").JSX.Element;
export {};
