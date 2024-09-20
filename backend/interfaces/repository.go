package interfaces

type Repository[T any, repository any] interface {
	GetList() ([]T, error)          // Retorna uma lista de objetos
	Get(id int64) (*T, error)       // Retorna um objeto por ID
	Create(*T) error                // Cria um novo objeto
	Update(id int64, data *T) error // Atualiza um objeto por ID
	Delete(id int64) error          // Deleta um objeto por ID
}
