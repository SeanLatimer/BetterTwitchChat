import { Generator, File, log } from 'battlecry';

const DUCKS_PATH = 'app/store/ducks';

export default class ComponentGenerator extends Generator {
  config = {
    generate: {
      args: 'name',
      description: 'Create a new duck',
    },
  };
  generate() {
    this.templates().forEach((file) => {
      file.saveAs(`${DUCKS_PATH}/__Name__/`, this.args.name);
    });
  }
}
