class LiveEntity {
    constructor(liveDate, duration, totalAmount, totalBuy, totalClient, limitPayDate, id){
        this.liveDate = liveDate;
        this.duration = duration;
        this.totalAmount = totalAmount;
        this.totalBuy = totalBuy;
        this.totalClient = totalClient;
        this.limitPayDate = limitPayDate;
        this.id = id;
    }

}

class Cliente {

    constructor(name, account, phoneNumber, compras, total, status, id){
        this.name = name;
        this.account = account;
        this.phoneNumber = phoneNumber;
        this.compras = compras;
        this.total = total;
        this.status = status;
        this.id = id;
    }

}

class Compra{
    constructor(client, amount, codigo, id){
        this.client = client;
        this.amount = amount;
        this.codigo = codigo;
        this.idCompra = id;
    }
}

class VivoDto {

    constructor(live, buyList){
        this.live = live;
        this.buyList = buyList;
    }

}