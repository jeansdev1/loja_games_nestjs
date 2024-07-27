import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, isNotEmpty, IsOptional } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";



@Entity({name: 'tb_produto'})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    nome: string

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2})
    preco: number

    @IsOptional()
    @Column({ type: 'text', nullable: true })
    descricao?: string

    @IsOptional()
    @IsDate()
    @Type(() => Date) // Converte o valor para um tipo Date
    dataLancamento?: Date;

    @IsOptional()
    @Column({ type: 'text', nullable: true })
    foto?: string

    @IsNotEmpty()
    @Column({ type: 'int', nullable: false })
    estoque: number

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    desenvolvedora: string

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
}

