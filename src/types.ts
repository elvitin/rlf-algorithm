// TODO: Checar se é correto que isso seja uma classe ao invéz de um tipo
interface Vertex {
  label: string;
  adjacent: Vertex[];
}

type GraphLikeList = Vertex[];

type ResultCell = string | null;

type ResultLine = ResultCell[];

// FIXME: perguntar se existe um nome melhor.
type ResultsMatrix = ResultLine[];

export type { Vertex, GraphLikeList, ResultCell, ResultLine, ResultsMatrix };
