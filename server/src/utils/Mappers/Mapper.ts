export default abstract class Mapper<M, D> {
  abstract toDTO(model: M): D;
  toDTOArr = (models: M[]) => models.map((model) => this.toDTO(model));
}
