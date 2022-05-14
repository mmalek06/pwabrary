interface _Author {
    identifier: string;
    name: string
}

type Author = Required<_Author>;

export default Author;
