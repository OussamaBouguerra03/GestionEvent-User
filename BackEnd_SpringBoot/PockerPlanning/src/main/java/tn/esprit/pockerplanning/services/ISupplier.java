package tn.esprit.pockerplanning.services;


import tn.esprit.pockerplanning.entities.Supplier;

import java.util.List;

public interface ISupplier {
	public Supplier addSupplier(Supplier f)  ;
	public Supplier updateSupplier(Supplier f, Long id);
	public void deleteSupplier(Long id );
	public Supplier getSupplier(Long id );
	public List<Supplier> getSuppliers();

}
