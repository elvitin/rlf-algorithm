import cloneDeep from 'lodash/cloneDeep';
import type { ResultCell, ResultsMatrix } from './types';

interface MatrixBuildProps {
  vertexLabels: string[];
  colorLabelType?: 'letters' | 'numbers';
}

class GraphColoringMatrix {
  private matrix!: ResultsMatrix;
  private vertexLabels!: string[];
  private colorLabelType!: MatrixBuildProps['colorLabelType'];
  private nextColorColumnIndex: number = 0;
  private constructor() {}
  public static build(
    { vertexLabels = [], colorLabelType = 'letters' }: MatrixBuildProps = {
      vertexLabels: [],
      colorLabelType: 'letters'
    }
  ): GraphColoringMatrix {
    const instance = new GraphColoringMatrix();
    instance.colorLabelType = colorLabelType;
    instance.vertexLabels = cloneDeep(vertexLabels);
    instance.matrix = Array.from({ length: vertexLabels.length }, () =>
      Array.from<ResultCell>({ length: vertexLabels.length }).fill(null)
    );

    return instance;
  }

  private generateNumberLabels(): string[] {
    return this.vertexLabels.map((_, index) => (index + 1).toString());
  }

  private generateLatterLabels(): string[] {
    return this.vertexLabels.map((_, index) => String.fromCharCode(65 + index));
  }

  public display() {
    const colorsLabels = this.colorLabelType === 'letters' ? this.generateLatterLabels() : this.generateNumberLabels();

    for (let x = 0; x < this.matrix.length + 1; x++) {
      for (let y = 0; y < this.matrix[0].length + 1; y++) {
        if (x === 0 && y === 0) {
          process.stdout.write('   ');
          continue;
        }

        if (x === 0) {
          process.stdout.write(`[${colorsLabels[y - 1]}]`);
          continue;
        }

        if (y === 0) {
          process.stdout.write(`[${this.vertexLabels[x - 1]}]`);
          continue;
        }

        process.stdout.write(`[${this.matrix[x - 1][y - 1] ?? ' '}]`);
      }
      console.info();
    }
  }

  private findIndexOfLabel(label: string) {
    return this.vertexLabels.indexOf(label);
  }

  public setColor(label: string, labelsOfAdjacentVertices: string[]): void {
    const labelIndex = this.findIndexOfLabel(label);
    if (labelIndex === -1) return;
    const color =
      this.colorLabelType === 'numbers'
        ? String(this.nextColorColumnIndex + 1)
        : this.generateLatterLabels()[this.nextColorColumnIndex];

    this.matrix[labelIndex][this.nextColorColumnIndex] = color;

    for (let i = 0; i < this.vertexLabels.length; i++) {
      if (i !== labelIndex && labelsOfAdjacentVertices.some(l => l === this.vertexLabels[i])) {
        this.matrix[i][this.nextColorColumnIndex] = 'x';
      }
    }

    this.nextColorColumnIndex++;
  }

  public hasColorSetted(label: string): boolean {
    const index = this.findIndexOfLabel(label);
    if (index === -1) return false;
    for (const cell of this.matrix[index]) {
      if (cell !== null && cell !== 'x') return true;
    }
    return false;
  }
}

export { GraphColoringMatrix };
