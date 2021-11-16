export default abstract class Mapper<M, D> {
	abstract toDTO(model: M): D;
	abstract fromDTO(dto: D): M;
}
