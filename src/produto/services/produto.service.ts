import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";



@Injectable()
export class ProdutoService {
    // injetar repositorio dentro da classe postagem
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) {}

    async findAll(): Promise<Produto[]>{
        // SELECT * FROM tb_postagens;
        return await this.produtoRepository.find();
    }
    
    async findById(id: number): Promise<Produto>{
        
        let buscaProduto = await this.produtoRepository.findOne({
            where:{
                id
            }
        })
        if (!buscaProduto)
            throw new HttpException('Produto não foi encontrada!', HttpStatus.NOT_FOUND)
        return buscaProduto;
    }

    async findByNome(nome: string): Promise<Produto[]>{
        
        return await this.produtoRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            }
        })
    }

    // salvar 
    async create(produto: Produto): Promise<Produto>{
        if (produto.categoria){
            
            let categoria = await this.categoriaService.findById(produto.categoria.id)
            
            if (!categoria)
                throw new HttpException('Categoria nao encontrada!', HttpStatus.NOT_FOUND);
            
            return await this.produtoRepository.save(produto);
        }
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto>{

        let buscaProduto = await this.findById(produto.id)

        if (!buscaProduto || !produto.id)
            throw new HttpException("Produto nao foi encontrada!", HttpStatus.NOT_FOUND)

        if (produto.categoria){
            let categoria = await this.categoriaService.findById(produto.categoria.id)
            
            if (!categoria)
                throw new HttpException('Categoria nao encontrada!', HttpStatus.NOT_FOUND);
            return await this.produtoRepository.save(produto);
        }

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscaProduto = await this.findById(id)
        if (!buscaProduto)
            throw new HttpException('A produto não foi encontrada', HttpStatus.NOT_FOUND);
 
        return await this.produtoRepository.delete(id);
    }
}