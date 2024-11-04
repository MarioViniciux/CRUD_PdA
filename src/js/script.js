const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const mProduto = document.getElementById('m-produto')
const mQuantidade = document.getElementById('m-quantidade')
const mValor = document.getElementById('m-valor')
const btnSalvar = document.getElementById('btnSalvar')
const valorEstoque = (mQuantidade.value * mValor.value)
const btnNew = document.getElementById("new")

let itens
let id

function openModal(edit = false, index = 0) {
    modal.classList.add("active")
    
    modal.onclick = e => {
        if (e.target.className.indexOf("modal-container") !== -1) {
            modal.classList.remove("active")
        }
    }

    if (edit) {
        mProduto.value = itens[index].produto
        mQuantidade.value = itens[index].quantidade
        mValor.value = itens[index].valor
        id = index 
    } else {
        mProduto.value = ''
        mQuantidade.value = ''
        mValor.value = ''
    }

    console.log(edit)
    console.log(mProduto, mQuantidade, mValor, valorEstoque)
}

function editItem(index) {
    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.produto}</td>
    <td>${item.quantidade}</td>
    <td>R$${(item.valor)}</td>
    <td>R$ ${(item.quantidade * item.valor)}
    <td class="acao">
        <button onclick="editItem(${index})"><i class="bx bx-edit"></i></button>
    </td>
    <td class="acao">
        <button onclick="deleteItem(${index})"><i class="bx bx-trash"></i></button>
    </td>
    `

    tbody.appendChild(tr)
}

btnSalvar.addEventListener("click", e => {
    if (mProduto.value == '' || mQuantidade.value == "" || mValor.value == '') {
        return
    }

    e.preventDefault()

    if (id !== undefined) {
        itens[id].produto = mProduto.value
        itens[id].quantidade = mQuantidade.value
        itens[id].valor = mValor.value
    } else {
        itens.push({"produto": mProduto.value, "quantidade": mQuantidade.value, "valor": mValor.value})
    }

    setItensBD()

    modal.classList.remove("active")
    loadItens()
    id = undefined
})

btnNew.addEventListener("click", (index) => {
    openModal(false, index)
})

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens))

loadItens()